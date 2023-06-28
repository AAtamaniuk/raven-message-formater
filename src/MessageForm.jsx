import React from 'react'
import PropTypes from 'prop-types'
import {
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Textarea,
    Card,
    CardBody,
    Text,
    Button,
} from '@chakra-ui/react'

const MessageForm = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const [frequency, setFrequency] = React.useState('')
    const [time, setTime] = React.useState(currentTime)
    const [unit, setUnit] = React.useState('нв підрозділ')

    const handleFraquncyChange = (event) => setFrequency(Number(event.target.value).toFixed(3))
    const handleTimeChange = (event) => setTime(event.target.value)
    const handleUnitChange = (event) => setUnit(event.target.value)

    const coordinateX = '48.4993';
    const coordinateY = '38.7867';


    const formatedMessage = `${frequency}/${time}\n${unit}\nX:${coordinateX}\nY:${coordinateY}`

    const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(formatedMessage);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

    return (
        <div>
            <NumberInput precision={3}>
                <FormLabel>Частота</FormLabel>
                <NumberInputField onChange={handleFraquncyChange} value={frequency} />
            </NumberInput>

            <FormControl>
                <FormLabel>Час</FormLabel>
                <Input type='time' onChange={handleTimeChange} value={time} />
            </FormControl>

            <FormControl>
                <FormLabel>Назва підрозділу</FormLabel>
                <Input onChange={handleUnitChange} value={unit} />
            </FormControl>

            <FormControl mb={15}>
                <FormLabel>Координати</FormLabel>
                <Textarea />
            </FormControl>

            <Card mb={15}>
                <CardBody>
                    <Text>{`${frequency}/${time}`}</Text>
                    <Text>{`${unit}`}</Text>
                    <Text>{`X:${coordinateX}`}</Text>
                    <Text>{`Y:${coordinateY}`}</Text>
                </CardBody>
            </Card>

            <Button onClick={copyContent}>Скопіювати</Button>
        </div>
    )
}

MessageForm.propTypes = {}

export default MessageForm