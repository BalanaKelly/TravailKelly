/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardTeacher() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue dans le tableau de bord enseignant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
}); */


import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, ScrollView } from 'react-native';

const FILIERES_BY_NIVEAU = {
    '1': ['GI', 'GRT', 'ASR', 'GBM'],
    '2': ['GI', 'GRT'],
    '3': ['GL', 'GRT', 'ASR'],
};

const DashboardTeacher = () => {
    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedNiveau, setSelectedNiveau] = useState('');
    const [schedule, setSchedule] = useState({}); // Emploi du temps par niveau et filière

    const fetchSchedule = (niveau, filiere) => {
        // Simuler un emploi du temps (à remplacer par des données réelles)
        const exampleSchedule = {
            '1': {
                'GI': ['Lundi: 10h-12h - Cours de Math', 'Mercredi: 14h-16h - Cours de Physique'],
                'GRT': ['Mardi: 10h-12h - Cours d\'Informatique'],
            },
            '2': {
                'GI': ['Jeudi: 10h-12h - Cours de Chimie'],
                'GRT': ['Lundi: 8h-10h - Cours de Biologie'],
            },
            '3': {
                'GL': ['Mardi: 14h-16h - Cours d\'Économie'],
                'GRT': ['Mercredi: 10h-12h - Cours de Philosophie'],
                'ASR': ['Jeudi: 8h-10h - Cours de Sociologie'],
            },
        };
        return exampleSchedule[niveau][filiere] || [];
    };

    const handleFiliereChange = (value) => {
        setSelectedFiliere(value);
        if (selectedNiveau) {
            const scheduleData = fetchSchedule(selectedNiveau, value);
            setSchedule(scheduleData);
        }
    };

    const handleNiveauChange = (value) => {
        setSelectedNiveau(value);
        setSelectedFiliere(''); // Réinitialiser la filière
        setSchedule([]); // Réinitialiser l'emploi du temps
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Emploi du temps</Text>

            <Text style={styles.label}>Sélectionnez une Filière</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedFiliere}
                    onValueChange={handleFiliereChange}
                    style={styles.picker}
                >
                    <Picker.Item label="Sélectionner une filière" value="" />
                    {selectedNiveau && FILIERES_BY_NIVEAU[selectedNiveau].map((filiere) => (
                        <Picker.Item key={filiere} label={filiere} value={filiere} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Sélectionnez un Niveau</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedNiveau}
                    onValueChange={handleNiveauChange}
                    style={styles.picker}
                >
                    <Picker.Item label="Sélectionner un niveau" value="" />
                    {Object.keys(FILIERES_BY_NIVEAU).map((niveau) => (
                        <Picker.Item key={niveau} label={`Niveau ${niveau}`} value={niveau} />
                    ))}
                </Picker>
            </View>

            <View style={styles.scheduleContainer}>
                {schedule.length > 0 ? (
                    schedule.map((course, index) => (
                        <Text key={index} style={styles.courseText}>{course}</Text>
                    ))
                ) : (
                    <Text style={styles.instructions}>
                        Veuillez sélectionner une filière et un niveau pour afficher l'emploi du temps.
                    </Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F9FF',
        width: '60%',
        alignSelf: 'center',
        borderRadius: 12,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1C3FAA',
    },
    label: {
        fontWeight: '600',
        marginBottom: 6,
        marginTop: 10,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    scheduleContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    courseText: {
        fontSize: 16,
        color: 'green',
        marginBottom: 5,
    },
    instructions: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center',
    },
});

export default DashboardTeacher;