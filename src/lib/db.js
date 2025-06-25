import mongoose from 'mongoose';

let cached = global.mongoose;   // reuse in hot reload / serverless
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect(uri) {
    if (cached.conn) return cached.conn;          // already connected
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(uri, {
                bufferCommands: false,
            })
            .then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
