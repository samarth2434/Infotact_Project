// Week 4 - Session 10: Node.js Runtime
// Lab: Building a simple file logger system

const fs = require('fs').promises
const path = require('path')
const http = require('http')
const url = require('url')

class FileLogger {
  constructor(logDir = './logs') {
    this.logDir = logDir
    this.ensureLogDirectory()
  }

  async ensureLogDirectory() {
    try {
      await fs.access(this.logDir)
    } catch (error) {
      await fs.mkdir(this.logDir, { recursive: true })
      console.log(`📁 Created log directory: ${this.logDir}`)
    }
  }

  async log(level, message, metadata = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      metadata,
      pid: process.pid
    }

    // Create log filename based on date
    const date = new Date().toISOString().split('T')[0]
    const filename = `${date}.log`
    const filepath = path.join(this.logDir, filename)

    // Format log entry
    const logLine = `[${timestamp}] ${level.toUpperCase()}: ${message} ${JSON.stringify(metadata)}\n`

    try {
      await fs.appendFile(filepath, logLine)
      console.log(`✅ Logged: ${level.toUpperCase()} - ${message}`)
    } catch (error) {
      console.error('❌ Failed to write log:', error.message)
    }
  }

  async info(message, metadata) {
    return this.log('info', message, metadata)
  }

  async warn(message, metadata) {
    return this.log('warn', message, metadata)
  }

  async error(message, metadata) {
    return this.log('error', message, metadata)
  }

  async debug(message, metadata) {
    return this.log('debug', message, metadata)
  }

  async getLogs(date) {
    const filename = `${date}.log`
    const filepath = path.join(this.logDir, filename)

    try {
      const content = await fs.readFile(filepath, 'utf8')
      return content.split('\n').filter(line => line.trim())
    } catch (error) {
      return []
    }
  }

  async getAllLogFiles() {
    try {
      const files = await fs.readdir(this.logDir)
      return files.filter(file => file.endsWith('.log'))
    } catch (error) {
      return []
    }
  }
}

// Initialize logger
const logger = new FileLogger()

// HTTP Server for log management
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const { pathname, query } = parsedUrl

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  try {
    if (pathname === '/') {
      // Serve HTML interface
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>📝 File Logger System</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .controls { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
            button { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
            .btn-primary { background: #667eea; color: white; }
            .btn-success { background: #28a745; color: white; }
            .btn-warning { background: #ffc107; color: black; }
            .btn-danger { background: #dc3545; color: white; }
            .logs { background: #f8f9fa; padding: 20px; border-radius: 8px; max-height: 500px; overflow-y: auto; }
            .log-entry { margin-bottom: 10px; padding: 8px; border-left: 4px solid #ddd; }
            .log-info { border-left-color: #17a2b8; }
            .log-warn { border-left-color: #ffc107; }
            .log-error { border-left-color: #dc3545; }
            .log-debug { border-left-color: #6c757d; }
            .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
            .stat-card { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
            .stat-number { font-size: 2em; font-weight: bold; color: #667eea; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📝 File Logger System</h1>
            <p>Session 10: Node.js Runtime & File System</p>
          </div>
          
          <div class="stats" id="stats"></div>
          
          <div class="controls">
            <button class="btn-primary" onclick="logMessage('info', 'User logged in', {userId: 123})">Log Info</button>
            <button class="btn-warning" onclick="logMessage('warn', 'High memory usage detected', {memory: '85%'})">Log Warning</button>
            <button class="btn-danger" onclick="logMessage('error', 'Database connection failed', {error: 'ECONNREFUSED'})">Log Error</button>
            <button class="btn-success" onclick="loadLogs()">Refresh Logs</button>
          </div>
          
          <div class="logs" id="logs">
            <p>Loading logs...</p>
          </div>

          <script>
            async function logMessage(level, message, metadata) {
              try {
                const response = await fetch('/log', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ level, message, metadata })
                })
                if (response.ok) {
                  loadLogs()
                  updateStats()
                }
              } catch (error) {
                console.error('Failed to log message:', error)
              }
            }

            async function loadLogs() {
              try {
                const today = new Date().toISOString().split('T')[0]
                const response = await fetch('/logs?date=' + today)
                const logs = await response.json()
                
                const logsDiv = document.getElementById('logs')
                if (logs.length === 0) {
                  logsDiv.innerHTML = '<p>No logs found for today</p>'
                } else {
                  logsDiv.innerHTML = logs.map(log => {
                    const level = log.match(/\\[(.*?)\\] (.*?):/)?.[2]?.toLowerCase() || 'info'
                    return '<div class="log-entry log-' + level + '">' + log + '</div>'
                  }).join('')
                }
              } catch (error) {
                document.getElementById('logs').innerHTML = '<p>Error loading logs</p>'
              }
            }

            async function updateStats() {
              try {
                const response = await fetch('/stats')
                const stats = await response.json()
                
                document.getElementById('stats').innerHTML = 
                  '<div class="stat-card"><div class="stat-number">' + stats.totalFiles + '</div><div>Log Files</div></div>' +
                  '<div class="stat-card"><div class="stat-number">' + stats.todayLogs + '</div><div>Today\\'s Logs</div></div>' +
                  '<div class="stat-card"><div class="stat-number">' + stats.errors + '</div><div>Errors</div></div>' +
                  '<div class="stat-card"><div class="stat-number">' + stats.warnings + '</div><div>Warnings</div></div>'
              } catch (error) {
                console.error('Failed to load stats:', error)
              }
            }

            // Load initial data
            loadLogs()
            updateStats()
            
            // Auto-refresh every 5 seconds
            setInterval(() => {
              loadLogs()
              updateStats()
            }, 5000)
          </script>
        </body>
        </html>
      `
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(html)

    } else if (pathname === '/log' && req.method === 'POST') {
      // Handle log creation
      let body = ''
      req.on('data', chunk => body += chunk)
      req.on('end', async () => {
        try {
          const { level, message, metadata } = JSON.parse(body)
          await logger.log(level, message, metadata)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ success: true }))
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: error.message }))
        }
      })

    } else if (pathname === '/logs') {
      // Get logs for specific date
      const date = query.date || new Date().toISOString().split('T')[0]
      const logs = await logger.getLogs(date)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(logs))

    } else if (pathname === '/stats') {
      // Get logging statistics
      const files = await logger.getAllLogFiles()
      const today = new Date().toISOString().split('T')[0]
      const todayLogs = await logger.getLogs(today)
      
      const errors = todayLogs.filter(log => log.includes('ERROR')).length
      const warnings = todayLogs.filter(log => log.includes('WARN')).length

      const stats = {
        totalFiles: files.length,
        todayLogs: todayLogs.length,
        errors,
        warnings
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(stats))

    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not Found')
    }

  } catch (error) {
    console.error('Server error:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal Server Error' }))
  }
})

const PORT = process.env.PORT || 3010

server.listen(PORT, () => {
  console.log(`🚀 File Logger Server running on http://localhost:${PORT}`)
  console.log(`📁 Logs directory: ${path.resolve('./logs')}`)
  
  // Log server startup
  logger.info('File Logger Server started', { 
    port: PORT, 
    pid: process.pid,
    nodeVersion: process.version 
  })
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...')
  await logger.info('File Logger Server stopped', { reason: 'SIGINT' })
  process.exit(0)
})

module.exports = { FileLogger }