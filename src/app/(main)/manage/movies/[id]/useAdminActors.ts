import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/form-elements/form.interface'

import { actorService } from '@/services/actor.service'

export const useAdminActors = () => {
	const { data: actors, isLoading: isActorsLoading } = useQuery({
		queryKey: ['list of actor'],
		queryFn: () => actorService.getAll(),
		select: data =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor.id
				})
			)
	})

	return { actors, isActorsLoading }
}
