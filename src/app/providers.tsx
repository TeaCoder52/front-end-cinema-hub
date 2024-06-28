'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<Toaster
				position='top-center'
				toastOptions={{
					duration: 2000,
					style: {
						background: '#333',
						color: '#fff'
					}
				}}
			/>
			{children}
		</QueryClientProvider>
	)
}

export default Providers
