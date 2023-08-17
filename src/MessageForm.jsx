import React, { useRef } from 'react';
import PropTypes from 'prop-types';
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
    useToast
} from '@chakra-ui/react';

const UNKNOWN_UNIT = 'нв підрозділ';
const TOAST_POSITION = 'bottom-left';

const MessageForm = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const toast = useToast();
    const [frequency, setFrequency] = React.useState('');
    const [time, setTime] = React.useState(currentTime);
    const [unit, setUnit] = React.useState(UNKNOWN_UNIT);
    const [coordinates, setCoordinates] = React.useState('');
    const ref = useRef(null)

    const handleFraquncyChange = (event) => setFrequency(event.target.value);
    const handleTimeChange = (event) => setTime(event.target.value);
    const handleUnitChange = (event) => setUnit(event.target.value);
    const handleCoordinatesChange = (event) => setCoordinates(event.target.value);

    const formatCoordinate = (unformatedCoordinate) => {
        if (unformatedCoordinate) return unformatedCoordinate.split(' ')[0].replace(',', '.');
        return '00.0000';
    }

    const formatFrequency = (unformatedFrequency) => {
        if (unformatedFrequency) return Number(unformatedFrequency).toFixed(3);
        return '000.000'
    }

    const co = coordinates.split('\n');

    const coordinateX = formatCoordinate(co[0]);
    const coordinateY = formatCoordinate(co[1]);
    const formattedFrequency = formatFrequency(frequency);

    const formatedMessage = `${formattedFrequency}/${time}\n${unit}\nX:${coordinateX}\nY:${coordinateY}`;

    const clearForm = () => {
        setFrequency('');
        setTime(currentTime);
        setUnit(UNKNOWN_UNIT);
        setCoordinates('');
        ref.current.focus();
    }

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(formatedMessage);
            toast({ title: 'Скопійовано в буфер обміну', status: 'success',  position: TOAST_POSITION });
            clearForm();
        } catch (err) {
            toast({ title: `'Помилка копіювання', ${err}`, status: 'error',  position: TOAST_POSITION });
        }
    }

    return (
        <div>
            <NumberInput precision={3}>
                <FormLabel>Частота</FormLabel>
                <NumberInputField
                    onChange={handleFraquncyChange}
                    onInvalid={() => console.log("INVALID")}
                    value={frequency}
                    ref={ref}
                />
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
                <Textarea
                    onChange={handleCoordinatesChange}
                    value={coordinates}
                    resize={'none'}
                />
            </FormControl>

            <Card mb={15}>
                <CardBody>
                    <Text>{`${formattedFrequency}/${time}`}</Text>
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