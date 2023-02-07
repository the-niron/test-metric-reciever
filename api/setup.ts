require('../initModuleAliases');

import request from 'request-promise-native';
import { consul } from '@pipedrive/docker-functional-tests';

before(async () => {
	const apiInstance = await consul.waitForService('insights-api');
	const mockServerInstance = await consul.waitForService('functional-insights-api-mock-api');

	(global as any).api = `http://${apiInstance.host}:${apiInstance.port}`;
	(global as any).mockServer = `http://${mockServerInstance.host}:${mockServerInstance.port}`;

	(global as any).get = (url: string, options: Record<string, any>) =>
		request({
			...options,
			url: url.startsWith('http') ? url : `${(global as any).api}${url}`,
			json: true,
		});

	(global as any).post = (url: string, options: Record<string, any>) =>
		request({
			...options,
			method: 'POST',
			url: url.startsWith('http') ? url : `${(global as any).api}${url}`,
			json: true,
		});
});
