import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';

const DashboardAdmin = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [courseDetails, setCourseDetails] = useState({
        module: '',
        professor: '',
        room: '',
        day: '',
        time: '',
        key: '',
    });
    const [courses, setCourses] = useState({});
    const [selectedFiliere, setSelectedFiliere] = useState('GI');
    const [selectedWeek, setSelectedWeek] = useState('2025-06-20');

    const handleAddCourse = (day, time) => {
        setModalVisible(true);
        setCourseDetails({ ...courseDetails, day, time, key: `${day}-${time}` });
    };

    const handleProgramCourse = () => {
        const { module, professor, room, key } = courseDetails;
        const courseInfo = `${module} | ${professor} | ${room}`;
        
        setCourses(prevCourses => ({
            ...prevCourses,
            [key]: {
                info: courseInfo,
                editable: false,
            },
        }));

        alert(`Cours programmé : ${courseInfo}`);
        setModalVisible(false);
        setCourseDetails({ module: '', professor: '', room: '', day: '', time: '', key: '' });
    };

    const handleEditCourse = (key) => {
        const course = courses[key];
        setCourseDetails({
            module: course.info.split(' | ')[0],
            professor: course.info.split(' | ')[1],
            room: course.info.split(' | ')[2],
            day: key.split('-')[0],
            time: key.split('-')[1],
            key: key,
        });
        setModalVisible(true);
    };

    const handleDeleteCourse = (key) => {
        setCourses(prevCourses => {
            const newCourses = { ...prevCourses };
            delete newCourses[key];
            return newCourses;
        });
    };

    const handleWeekChange = (increment) => {
        const currentDate = new Date(selectedWeek);
        currentDate.setDate(currentDate.getDate() + increment);
        setSelectedWeek(currentDate.toISOString().split('T')[0]); // Met à jour la semaine sélectionnée
    };

    const renderCourse = (day, time) => {
        const courseKey = `${day}-${time}`;
        const course = courses[courseKey];

        if (!course) {
            return <Text style={styles.addCourse}>Ajouter un cours</Text>;
        }

        return (
            <View style={styles.courseContainer}>
                <Text style={styles.moduleText}>{course.info.split(' | ')[0]}</Text>
                <View style={styles.infoContainer}>
                    <Icon name="user" size={16} color="gray" />
                    <Text style={styles.courseText}>{course.info.split(' | ')[1]}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Icon name="map-marker" size={16} color="gray" />
                    <Text style={styles.courseText}>{course.info.split(' | ')[2]}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleEditCourse(courseKey)}>
                        <Icon name="edit" size={20} color="blue" />
                    </TouchableOpacity>
                    <View style={styles.iconSpacing} />
                    <TouchableOpacity onPress={() => handleDeleteCourse(courseKey)}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Gestion des emplois du temps - Niveau 2</Text>

            <View style={styles.header}>
                <Text style={styles.weekLabel}>Filière:</Text>
                <Picker
                    selectedValue={selectedFiliere}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedFiliere(itemValue)}
                >
                    <Picker.Item label="GI" value="GI" />
                    <Picker.Item label="GRT" value="GRT" />
                    {/* Ajoute d'autres filières ici */}
                </Picker>
                <Text style={styles.weekLabel}>Semaine:</Text>
                <TouchableOpacity onPress={() => handleWeekChange(-7)}>
                    <Icon name="chevron-left" size={24} />
                </TouchableOpacity>
                <Text style={styles.selectedWeek}>
                    {`Semaine du ${selectedWeek} au ${new Date(new Date(selectedWeek).setDate(new Date(selectedWeek).getDate() + 6)).toISOString().split('T')[0]}`}
                </Text>
                <TouchableOpacity onPress={() => handleWeekChange(7)}>
                    <Icon name="chevron-right" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.calendarButton}>
                    <Icon name="calendar" size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.table}>
                <Text style={styles.tableHeader}>Emploi du temps</Text>
                
                <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                        <Text>Horaire</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>Lundi</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>Mardi</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>Mercredi</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>Jeudi</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>Vendredi</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text>Samedi</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.timeCell}>
                        <Text style={styles.timeSlot}>09:00 - 10:30</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <TouchableOpacity onPress={() => handleAddCourse('Lundi', '09:00 - 10:30')}>
                            {renderCourse('Lundi', '09:00 - 10:30')}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableCell}>
                        <TouchableOpacity onPress={() => handleAddCourse('Mardi', '09:00 - 10:30')}>
                            {renderCourse('Mardi', '09:00 - 10:30')}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableCell}>
                        <TouchableOpacity onPress={() => handleAddCourse('Mercredi', '09:00 - 10:30')}>
                            {renderCourse('Mercredi', '09:00 - 10:30')}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableCell}>
                        <TouchableOpacity onPress={() => handleAddCourse('Jeudi', '09:00 - 10:30')}>
                            {renderCourse('Jeudi', '09:00 - 10:30')}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableCell}>
                        <TouchableOpacity onPress={() => handleAddCourse('Vendredi', '09:00 - 10:30')}>
                            {renderCourse('Vendredi', '09:00 - 10:30')}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tableCell}>
                        <TouchableOpacity onPress={() => handleAddCourse('Samedi', '09:00 - 10:30')}>
                            {renderCourse('Samedi', '09:00 - 10:30')}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Modal for Adding Course */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Programmer un nouveau cours</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Matière / Module"
                        value={courseDetails.module}
                        onChangeText={(text) => setCourseDetails({ ...courseDetails, module: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Professeur / Enseignant"
                        value={courseDetails.professor}
                        onChangeText={(text) => setCourseDetails({ ...courseDetails, professor: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Salle / Laboratoire"
                        value={courseDetails.room}
                        onChangeText={(text) => setCourseDetails({ ...courseDetails, room: text })}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Programmer le cours" onPress={handleProgramCourse} />
                        <Button title="Annuler" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            
                {/* Modal for Calendar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={calendarVisible}
                onRequestClose={() => setCalendarVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Sélectionnez une semaine</Text>
                    <Calendar
                        onDayPress={(day) => {
                            setSelectedWeek(day.dateString);
                            setCalendarVisible(false);
                        }}
                        markedDates={{
                            [selectedWeek]: { selected: true, marked: true },
                        }}
                    />
                    <Button title="Fermer" onPress={() => setCalendarVisible(false)} />
                </View>
            </Modal>

            <View style={styles.actions}>
                <View style={styles.actionButton}>
                    <Button title="Ajouter un emploi du temps" onPress={() => {/* Logique pour ajouter */}} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 5,
    },
    status: {
        fontSize: 16,
        marginBottom: 20,
    },
    adminPanel: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalCourses: {
        fontSize: 16,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        height: 30,
        width: 100,
    },
    calendarButton: {
        marginLeft: 10,
    },
    selectedWeek: {
        fontSize: 16,
        marginLeft: 10,
    },
    table: {
        marginBottom: 20,
    },
    tableHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    week: {
        fontSize: 16,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    timeCell: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 2,
        borderRadius: 5,
    },
    tableCell: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 2,
        borderRadius: 5,
    },
    addCourse: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    courseContainer: {
        alignItems: 'flex-start',
        padding: 5,
    },
    moduleText: {
        fontSize: 18,
        color: 'blue',
        fontWeight: 'bold',
    },
    courseText: {
        fontSize: 16,
        marginLeft: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '30%',
    },
    iconSpacing: {
        width: 10, // Espace entre les icônes
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    actions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default DashboardAdmin;