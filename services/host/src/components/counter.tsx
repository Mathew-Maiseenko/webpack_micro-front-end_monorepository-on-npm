import React from 'react'
import pngeshka from './../assets/png-svgrepo-com.png'
import { getSum } from '@packages/shared'

import Calendar from './../assets/calendar-heart-svgrepo-com.svg'

interface CounterState {
	count: number
}

function abb(a: number) {
	console.log(a)
}

export default class Counter extends React.Component<{}, CounterState> {
	constructor(props: any) {
		super(props)
		this.state = {
			count: 0,
		}
	}

	inc = () => {
		this.setState(prevState => ({
			...prevState,
			count: prevState.count + 1,
		}))
	}

	render(): React.ReactNode {
		return (
			<>
				<img src={pngeshka} alt='///' />
				<Calendar style={{ color: 'blue' }} height={500} width={500} />
				<div>{this.state.count}</div>
				<div>{__ENV_DEVICE__}</div>
				<button
					onClick={() => {
						this.inc()
						abb(123)
						getSum(1, 3)
					}}
				>
					inc
				</button>
			</>
		)
	}
}
