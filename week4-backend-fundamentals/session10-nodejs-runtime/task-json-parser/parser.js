// Week 4 - Session 10: Node.js Runtime
// Task: Create a script to parse data files to JSON

const fs = require('fs').promises
const path = require('path')

class DataParser {
  constructor() {
    this.supportedFormats = ['csv', 'txt', 'log']
  }

  // Parse CSV to JSON
  parseCSV(content) {
    const lines = content.trim().split('\n')
    if (lines.length === 0) return []

    const headers = lines[0].split(',').map(h => h.trim())
    const data = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      const row = {}
      
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      
      data.push(row)
    }

    return data
  }

  // Parse structured text to JSON
  parseStructuredText(content) {
    const lines = content.trim().split('\n')
    const data = []
    let currentObject = {}

    for (const line of lines) {
      const trimmedLine = line.trim()
      
      if (trimmedLine === '' || trimmedLine === '---') {
        if (Object.keys(currentObject).length > 0) {
          data.push(currentObject)
          currentObject = {}
        }
        continue
      }

      const colonIndex = trimmedLine.indexOf(':')
      if (colonIndex !== -1) {
        const key = trimmedLine.substring(0, colonIndex).trim()
        const value = trimmedLine.substring(colonIndex + 1).trim()
        currentObject[key] = value
      }
    }

    if (Object.keys(currentObject).length > 0) {
      data.push(currentObject)
    }

    return data
  }

  // Parse log files to JSON
  parseLogFile(content) {
    const lines = content.trim().split('\n')
    const data = []

    for (const line of lines) {
      if (line.trim() === '') continue

      // Parse common log format: [timestamp] LEVEL: message metadata
      const logMatch = line.match(/^\[(.*?)\]\s+(\w+):\s+(.*?)(?:\s+(\{.*\}))?$/)
      
      if (logMatch) {
        const [, timestamp, level, message, metadataStr] = logMatch
        let metadata = {}
        
        try {
          if (metadataStr) {
            metadata = JSON.parse(metadataStr)
          }
        } catch (e) {
          metadata = { raw: metadataStr }
        }

        data.push({
          timestamp,
          level,
          message,
          metadata
        })
      } else {
        // Fallback for unstructured logs
        data.push({
          timestamp: new Date().toISOString(),
          level: 'INFO',
          message: line,
          metadata: {}
        })
      }
    }

    return data
  }

  // Main parsing method
  async parseFile(inputPath, outputPath = null) {
    try {
      // Check if file exists
      await fs.access(inputPath)
      
      const content = await fs.readFile(inputPath, 'utf8')
      const extension = path.extname(inputPath).toLowerCase().substring(1)
      
      let parsedData = []

      switch (extension) {
        case 'csv':
          parsedData = this.parseCSV(content)
          break
        case 'txt':
          parsedData = this.parseStructuredText(content)
          break
        case 'log':
          parsedData = this.parseLogFile(content)
          break
        default:
          throw new Error(`Unsupported file format: ${extension}`)
      }

      const result = {
        metadata: {
          sourceFile: inputPath,
          parsedAt: new Date().toISOString(),
          recordCount: parsedData.length,
          format: extension
        },
        data: parsedData
      }

      // Save to output file if specified
      if (outputPath) {
        await fs.writeFile(outputPath, JSON.stringify(result, null, 2))
        console.log(`✅ Parsed ${parsedData.length} records from ${inputPath}`)
        console.log(`📄 Output saved to: ${outputPath}`)
      }

      return result

    } catch (error) {
      console.error(`❌ Error parsing file ${inputPath}:`, error.message)
      throw error
    }
  }

  // Parse multiple files
  async parseDirectory(dirPath, outputDir = './parsed') {
    try {
      const files = await fs.readdir(dirPath)
      const results = []

      // Ensure output directory exists
      try {
        await fs.access(outputDir)
      } catch {
        await fs.mkdir(outputDir, { recursive: true })
      }

      for (const file of files) {
        const filePath = path.join(dirPath, file)
        const extension = path.extname(file).toLowerCase().substring(1)

        if (this.supportedFormats.includes(extension)) {
          const outputFile = path.join(outputDir, `${path.basename(file, path.extname(file))}.json`)
          
          try {
            const result = await this.parseFile(filePath, outputFile)
            results.push({
              file,
              success: true,
              recordCount: result.data.length
            })
          } catch (error) {
            results.push({
              file,
              success: false,
              error: error.message
            })
          }
        }
      }

      return results
    } catch (error) {
      console.error(`❌ Error parsing directory ${dirPath}:`, error.message)
      throw error
    }
  }
}

// Create sample data files for testing
async function createSampleFiles() {
  const sampleDir = './sample-data'
  
  try {
    await fs.mkdir(sampleDir, { recursive: true })
  } catch {}

  // Sample CSV
  const csvContent = `name,email,age,department
John Doe,john@example.com,30,Engineering
Jane Smith,jane@example.com,25,Design
Bob Johnson,bob@example.com,35,Marketing
Alice Brown,alice@example.com,28,Engineering`

  // Sample structured text
  const txtContent = `Name: John Doe
Email: john@example.com
Department: Engineering
Salary: 75000
---
Name: Jane Smith
Email: jane@example.com
Department: Design
Salary: 65000
---
Name: Bob Johnson
Email: bob@example.com
Department: Marketing
Salary: 70000`

  // Sample log file
  const logContent = `[2024-01-15T10:30:00.000Z] INFO: User login successful {"userId": 123, "ip": "192.168.1.1"}
[2024-01-15T10:31:15.000Z] WARN: High memory usage detected {"memory": "85%", "threshold": "80%"}
[2024-01-15T10:32:30.000Z] ERROR: Database connection failed {"error": "ECONNREFUSED", "host": "localhost"}
[2024-01-15T10:33:45.000Z] INFO: User logout {"userId": 123, "sessionDuration": "3m45s"}`

  await fs.writeFile(path.join(sampleDir, 'users.csv'), csvContent)
  await fs.writeFile(path.join(sampleDir, 'employees.txt'), txtContent)
  await fs.writeFile(path.join(sampleDir, 'application.log'), logContent)

  console.log('📁 Sample data files created in ./sample-data/')
}

// CLI interface
async function main() {
  const parser = new DataParser()
  
  // Create sample files
  await createSampleFiles()
  
  console.log('🔄 Parsing sample files...\n')
  
  // Parse individual files
  try {
    await parser.parseFile('./sample-data/users.csv', './parsed/users.json')
    await parser.parseFile('./sample-data/employees.txt', './parsed/employees.json')
    await parser.parseFile('./sample-data/application.log', './parsed/application.json')
    
    console.log('\n✅ All files parsed successfully!')
    console.log('📂 Check the ./parsed/ directory for JSON outputs')
    
  } catch (error) {
    console.error('❌ Parsing failed:', error.message)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { DataParser }