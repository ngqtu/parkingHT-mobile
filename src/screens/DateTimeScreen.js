import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Display } from '../utils';
import { Colors } from '../contants';

const DateTimeScreen = ({navigation}) => {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [selectedTime, setSelectedTime] = React.useState({ hours: 12, minutes: 14 });
    const [selectedTime2, setSelectedTime2] = React.useState({ hours: 12, minutes: 14 });

    const onDismiss = React.useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            setSelectedTime({ hours, minutes });
        },
        [setVisible, setSelectedTime]
    );
    const onDismiss2 = React.useCallback(() => {
        setVisible2(false);
    }, [setVisible2]);
    const onConfirm2 = React.useCallback(
        ({ hours, minutes }) => {
            setVisible2(false);
            setSelectedTime2({ hours, minutes });
        },
        [setVisible2, setSelectedTime2]
    );
    const minDate = new Date(); // Today
    const maxDate = new Date(2026, 6, 3);
    const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY')
    const [selectedEndtDate, setSelectedEndDate] = useState('DD/MM/YYYY')
    const onDateChange = (date, type) => {
        console.log(JSON.stringify(date))
        const newDate = JSON.stringify(date);
        const newDate1 = newDate.substring(1, newDate.length - 1)
        const dates = newDate1.split("T")
        const date1 = dates[0].split("-")
        const day = date1[2]
        const month = date1[1]
        const year = date1[0]
        console.log(day + "/" + month + "/" + year)
        if (type == 'END_DATE') {
            if (day == undefined) {
                setSelectedEndDate('DD/MM/YYYY')
            } else {
                setSelectedEndDate(day + "/" + month + "/" + year)
            }
        } else {
            setSelectedStartDate(day + "/" + month + "/" + year)
            setSelectedEndDate('DD/MM/YYYY')
        }
    }
    return (
        <>
            <View>
                <View style={{ flexDirection: 'row', paddingTop: 50 }}>
                    <Ionicons
                        name="arrow-back-outline" size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 700 }}>Chọn ngày và thời gian</Text>
                </View>
            </View>
            <View style={{ paddingTop: 20 }}>
                <Text style={{ fontWeight: 700 }}>Chọn ngày </Text>
            </View>

            <View style={{ paddingTop: 15 }}>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                />
                <Text>{"Ngày bắt đầu :" + selectedStartDate}</Text>
                <Text>{"Ngày kết thúc :" + selectedEndtDate}</Text>
            </View>

            <Text style={{ marginTop: 30, fontWeight: 700 }}>Chọn thời gian</Text>

            <SafeAreaProvider style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    <Text>Thời gian bắt đầu</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 5, borderRadius: 20, justifyContent: 'center' }}>
                        <IconButton
                            icon={() => <Ionicons name="time-outline" size={25} color="red" />} // Use the calendar icon
                            onPress={() => setVisible(true)}
                        />
                        <Text style={{ fontSize: 15, paddingRight: 10 }}>{selectedTime.hours}:{selectedTime.minutes}</Text>
                    </View>
                    <TimePickerModal
                        visible={visible}
                        onDismiss={onDismiss}
                        onConfirm={onConfirm}
                        hours={selectedTime.hours}
                        minutes={selectedTime.minutes}
                    />
                </View>
                <Ionicons
                    style={{ paddingTop: 50 }}
                    name='arrow-forward-outline' size={20}
                />
                <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                    <Text>Thời gian kết thúc</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 5, borderRadius: 20, justifyContent: 'center' }}>
                        <IconButton
                            icon={() => <Ionicons name="time-outline" size={25} color="red" />} // Use the calendar icon
                            onPress={() => setVisible2(true)}
                        />
                        <Text style={{ fontSize: 15, paddingRight: 10 }}>{selectedTime2.hours}:{selectedTime2.minutes}</Text>
                    </View>
                    <TimePickerModal
                        visible={visible2}
                        onDismiss={onDismiss2}
                        onConfirm={onConfirm2}
                        hours={selectedTime2.hours}
                        minutes={selectedTime2.minutes}
                    />
                </View>
            </SafeAreaProvider>
            <View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Booking') }
            style={styles.siginButton}>
                <Text
                    style={styles.signinButtonText}>
                    Tiếp tục
                </Text>
            </TouchableOpacity>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    siginButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        marginHorizontal: 20,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
    },
})
export default DateTimeScreen