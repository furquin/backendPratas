import { Global, Module } from '@nestjs/common'
import { ACLService } from './acl.service'

@Global()
@Module({
	providers: [ACLService],
	exports: [ACLService],
})
export class ACLModule {}
