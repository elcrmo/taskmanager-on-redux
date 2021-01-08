import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import { nanoid } from 'nanoid'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile, readdir } = require('fs').promises

const Root = () => ''

try {
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

const template = {
  taskId: '',
  title: '',
  _isDeleted: false,
  _createdAt: 0,
  _deletedAt: 0,
  status: 'new'
}

const toWriteFile = (fileData, category) => {
  const text = JSON.stringify(fileData)
  writeFile(`${__dirname}/tasks/${category}.json`, text, { encoding: 'utf8' })
}

const toReadFile = (category) => {
  return readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' }).then((text) =>
    JSON.parse(text)
  )
}

const deleteSpecialFields = (field) => {
  return field
    .filter((item) => !item._isDeleted)
    .map((item) => {
      return Object.keys(item).reduce((acc, rec) => {
        if (rec[0] !== '_') {
          return { ...acc, [rec]: item[rec] }
        }
        return acc
      }, {})
    })
}

const delFilter = (task) => {
  return task.filter(item => !item._isDeleted)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/categories', async (req, res) => {
  const data = await readdir(`${__dirname}/tasks`).then((categoryList) =>
    categoryList.map((item) => item.slice(0, -5))
  )
  res.json(data)
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const { title } = req.body
  const newTask = {
    ...template,
    taskId: nanoid(),
    title,
    _createdAt: +new Date()
  }
  const taskList = await toReadFile(category)
    .then((file) => {
      const list = [...file, newTask]
      toWriteFile(list, category)
      return list
    })
    .catch(async () => {
      await toWriteFile([newTask], category)
      return [newTask]
    })
  res.json(delFilter(taskList))
})

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const data = await toReadFile(category)
    .then((file) => deleteSpecialFields(file))
    .catch(() => {
      return ['No category']
    })
  res.json(data)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const data = await toReadFile(category)
    .then((file) =>
      file.map((item) => {
        return item.taskId === id ? { ...item, _isDeleted: true, _deletedAt: +new Date() } : item
      })
    )
    .catch(() => {
      res.status(404)
      res.end()
    })
  toWriteFile(data, category)
  res.json(delFilter(data))
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const period = {
    day: 86400000,
    week: 604800000,
    month: 2592000000
  }

  if (Object.keys(period).indexOf(timespan) < 0) {
    res.status(404)
    res.end()
  }
  const data = await toReadFile(category)
    .then((file) => {
      return file.filter((task) => {
        return task._createdAt + period[timespan] > +new Date()
      })
    })
    .then((file) => deleteSpecialFields(file))
  res.json(data)
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  let { status, title } = req.body
  const statusArray = ['done', 'new', 'in progress', 'blocked']
  const check = statusArray.includes(status)
  if (status && !check) {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
    res.end()
  }
  const data = await toReadFile(category)
    .then((file) => {
      return file.map((task) => {
        if (task.taskId !== id) {
          return task
        }
        if (typeof status === 'undefined') {
          status = task.status
        }
        if (typeof title === 'undefined') {
          title = task.title
        }
        return { ...task, status, title }
      })
    })
    .catch(() => {
      res.status(404)
      res.end()
    })
  toWriteFile(data, category)
  res.json(delFilter(data))
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
