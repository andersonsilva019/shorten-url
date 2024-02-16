import Redis from 'ioredis'

const redis = new Redis({
  host: '172.17.0.1',
})

export default redis
