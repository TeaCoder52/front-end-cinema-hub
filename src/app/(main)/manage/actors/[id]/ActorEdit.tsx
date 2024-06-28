'use client'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss'
import Button from '@/components/ui/form-elements/button/Button'
import Field from '@/components/ui/form-elements/field/Field'
import SlugField from '@/components/ui/form-elements/slug-field/SlugField'
import UploadField from '@/components/ui/form-elements/upload-field/UploadField'
import Heading from '@/components/ui/heading/Heading'

import { IActorEditInput } from '@/types/actor.types'

import generateSlug from '@/utils/string/generateSlug'

import { useActorEdit } from './useActorEdit'

interface IActorEdit {
	actorId: string
}

const ActorEdit: FC<IActorEdit> = ({ actorId }) => {
	const { actor, onSubmit, isLoading } = useActorEdit(actorId)

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues
	} = useForm<IActorEditInput>({
		mode: 'onChange',
		values: {
			name: actor?.name || '',
			slug: actor?.slug || '',
			photoUrl: actor?.photoUrl || ''
		}
	})

	return (
		<div className='px-6'>
			<Heading>Настройка актёра</Heading>
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<div className='space-y-4'>
						{Array.from({ length: 3 }).map((_, index) => (
							<SkeletonLoader className='h-10' key={index} />
						))}
					</div>
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Имя обязательно'
								})}
								placeholder='Имя'
								error={errors.name}
							/>

							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
								register={register}
								error={errors.slug}
							/>

							<Controller
								name='photoUrl'
								control={control}
								defaultValue=''
								render={({
									field: { value, onChange },
									fieldState: { error }
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										error={error}
										folder='actors'
										placeholder='Фотография'
										style={{ marginTop: 15 }}
									/>
								)}
								rules={{
									required: 'Фотография обязательна!'
								}}
							/>
						</div>

						<Button>Сохранить</Button>
					</>
				)}
			</form>
		</div>
	)
}

export default ActorEdit
