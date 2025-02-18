import { ApiErrorPayload, ApiSshKeyPairResponse } from '@lightdash/common';
import express from 'express';
import {
    Controller,
    Middlewares,
    OperationId,
    Post,
    Request,
    Response,
    Route,
    SuccessResponse,
    Tags,
} from 'tsoa';
import { sshKeyPairService } from '../services/services';
import { isAuthenticated, unauthorisedInDemo } from './authentication';

@Route('/api/v1/ssh')
@Response<ApiErrorPayload>('default', 'Error')
@Tags('SSH Keypairs')
export class SshController extends Controller {
    @Middlewares([isAuthenticated, unauthorisedInDemo])
    @SuccessResponse('201', 'Success')
    @Post('key-pairs')
    @OperationId('createSshKeyPair')
    async createSshKeyPair(
        @Request() req: express.Request,
    ): Promise<ApiSshKeyPairResponse> {
        const results = await sshKeyPairService.create();
        this.setStatus(201);
        return {
            status: 'ok',
            results,
        };
    }
}
