import { Injectable } from '@nestjs/common'
import { connect, Channel } from 'amqplib'

@Injectable()
export default class RabbitmqService {
	private channel: Channel
	async publishInQueue(queue: string, message: string) {
		const connection = await connect(process.env.RMQ_URI)
		this.channel = await connection.createConfirmChannel()
		return this.channel.sendToQueue(queue, Buffer.from(message))
	}
}
