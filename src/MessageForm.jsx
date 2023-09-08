import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    IconButton,
    NumberInput,
    NumberInputField,
    Textarea,
    Card,
    CardBody,
    Text,
    Button,
    useToast
} from '@chakra-ui/react';
import { SmallCloseIcon, RepeatClockIcon } from '@chakra-ui/icons'

const UNKNOWN_UNIT = 'нв підрозділ';
const TOAST_POSITION = 'bottom-left';
const ONLY_NUMBER_OR_DOT_REGEXP = /[^\d.]|\.(?=.*\.)/g;

const MessageForm = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const toast = useToast();
    const [frequency, setFrequency] = React.useState('');
    const [time, setTime] = React.useState(currentTime);
    const [unit, setUnit] = React.useState(UNKNOWN_UNIT);
    const [coordinates, setCoordinates] = React.useState('');
    const ref = useRef(null)

    const handleFraquncyChange = (event) => {
        const { value } = event.target;
        // if (ONLY_NUMBER_OR_DOT_REGEXP.test(value)) return;
        setFrequency(value)
    }
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

    const clearUnitForm = () => setUnit('');
    const setCurrentTime = () => setTime(currentTime);

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(formatedMessage);
            toast({ title: 'Скопійовано в буфер обміну', status: 'success', position: TOAST_POSITION });
        } catch (err) {
            toast({ title: `'Помилка копіювання', ${err}`, status: 'error', position: TOAST_POSITION });
        }
    }

    return (
        <Box maxWidth="300px">
            <NumberInput precision={3}>
                <FormLabel>Частота</FormLabel>
                <Input
                    type='number'
                    onChange={handleFraquncyChange}
                    value={frequency}
                    ref={ref}
                />
            </NumberInput>

            <Box display='flex' alignItems='self-end'>
                <FormControl mr='15px'>
                    <FormLabel>Час</FormLabel>
                    <Input type='time' onChange={handleTimeChange} value={time} />
                </FormControl>
                <IconButton
                    tabIndex='0'
                    onClick={setCurrentTime}
                    variant='outline'
                    aria-label='Clear unit'
                    fontSize='20px'
                    icon={<RepeatClockIcon />}
                />
            </Box>

            <Box display='flex' alignItems='self-end'>
                <FormControl mr='15px'>
                    <FormLabel>Назва підрозділу</FormLabel>
                    <Input onChange={handleUnitChange} value={unit} />
                </FormControl>
                <IconButton
                    onClick={clearUnitForm}
                    variant='outline'
                    aria-label='Clear unit'
                    fontSize='20px'
                    icon={<SmallCloseIcon />}
                />
            </Box>

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

            <Button onClick={copyContent} colorScheme='blue' mr="15px">Скопіювати</Button>
            <Button onClick={clearForm} colorScheme='red'>Oчистити</Button>
        </Box >
    )
}

MessageForm.propTypes = {}

export default MessageForm