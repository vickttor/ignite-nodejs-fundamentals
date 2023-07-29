// Netflix & Spotify 
// Writeable Streams - sent bit by biy

// Importação de clientes via CSV (Excel)
// Readable Streams - incrementally read

// Streams -> It's common to connect different streams

import { Readable, Writable, Transform } from "node:stream";

// Chunks -> Peaces of data readable and writeable by Streams
// They cannot be of primitive types (String, integers, booleans)
// They need to be a Buffer.

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(()=> {
      if(i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }

}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream() // Read
  .pipe(new InverseNumberStream()) // Transform
  .pipe(new MultiplyByTenStream()) // Write