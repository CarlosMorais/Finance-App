import React from "react";
import { Container } from "./styles";
import { Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function LightButton(props) {
    const { icon = '', label = '', onPress = () => {} } = props;

    return (
            <Container onPress={() => { onPress() }}>
                <FontAwesomeIcon icon={icon} size={35} color={'#c9c9c9'} style={{ opacity: 0.85, marginLeft: 10, marginRight: 20, }} />
                <Text style={{ color: '#c0c0c0', opacity: 0.8, fontWeight: 'bold', fontSize: 20,}}>{label}</Text>
            </Container>
    )
}