import { DeviceEventEmitter } from 'react-native'

export default {
    emit: (event, data) => {
        DeviceEventEmitter.emit(event, data)
    }
}
