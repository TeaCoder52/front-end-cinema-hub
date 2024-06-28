import type { EditorProps } from 'draft-js'
import type {
	ButtonHTMLAttributes,
	CSSProperties,
	InputHTMLAttributes
} from 'react'
import type {
	ControllerRenderProps,
	FieldError,
	UseFormRegister
} from 'react-hook-form'
import type { Options } from 'react-select'

/* Field */

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	error?: FieldError
}

/* Button */

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline'
	size?: 'sm' | 'md'
}

/* Slug field */

export interface ISlugField {
	error?: FieldError
	register: UseFormRegister<any>
	generate: () => void
}

/* Draft js editor */

type TypeEditorField = EditorProps & IField

export interface ITextEditor extends Omit<TypeEditorField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string
}

/* Upload field */

export interface IUploadField {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

/* React Select */

export interface IOption {
	label: string
	value: string
}

export interface ISelect extends IField {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
}
