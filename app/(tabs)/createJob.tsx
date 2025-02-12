import { uuid } from 'expo-modules-core';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';


// Paleta y estilo “neomórfico”
const BACKGROUND_COLOR = '#E9ECF2';
const ELEMENT_BG       = '#FFFFFF';
const SHADOW_COLOR     = '#000'; // para la sombra
const PRIMARY_COLOR    = '#4C74D9';


export default function CreateJobWizard() {
const router = useRouter();

  // “Global” state del wizard:
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState(''); 
  const [duration, setDuration] = useState('');
  const [rate, setRate] = useState('');

  // Paso actual
    const [step, setStep] = useState(1);

    // Avanzar al siguiente paso
    const nextStep = () => setStep(step + 1);

    // Retroceder al paso anterior
    const prevStep = () => setStep(step - 1);

    // Enviar el formulario
    const handlePublish = () => {
        if (!rate || !duration || !location || !category || !longDescription || !shortDescription || !title) {
            alert('Por favor, completa todos los campos');
            return;
        }
    
    const job = {
        id: uuidv4(),
        title,
        shortDescription,
        longDescription,
        category,
        location,
        rate: Number(rate),
        duration,
        createdAt: new Date().toISOString(),
        rating: 0,
        ratingCount: 0,
        postedBy: 'current-user-id',
        status: 'open' as const,
    
    };
    console.log('Publicando:', job);

    // Aquí podríamos enviar el job a la API
    // IMPLEMENTAR
    /*  router.push(
          {
            pathname:'/(tabs)/homeUI'
          }
        );
      } */

    router.back();
    }

    return (
    <View style={styles.container}>
        <ScrollView
            contentContainerStyle={{ padding: 80 }}
            keyboardShouldPersistTaps="handled">
        </ScrollView>

      {step === 1 && (
        <Step1 
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        shortDescription={shortDescription}
        setShortDescription={setShortDescription}
        onNext={nextStep} />
        )}
        {step === 2 && (
        <Step2
        longDescription={longDescription}
        setLongDescription={setLongDescription}
        location={location}
        setLocation={setLocation}
        duration={duration}
        setDuration={setDuration}
        onNext={nextStep}
        onBack={prevStep} />
        )}
        {step === 3 && (
        <Step3
        rate={rate}
        setRate={setRate}
        onBack={prevStep} 
        onFinish={handlePublish}
        />
        )}

        </View>
        );


}

// Paso 1: Título, categoría, desc corta
function Step1({
  title,
  setTitle,
  category,
  setCategory,
  shortDescription,
  setShortDescription,
  onNext,
}: {
  title: string;
  setTitle: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  shortDescription: string;
  setShortDescription: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.titleText}>Paso 1: Datos Básicos</Text>

      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Título del trabajo"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Categoría *</Text>
      <TextInput
        style={styles.input}
        placeholder="Eventos, Hostelería..."
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Descripción breve</Text>
      <TextInput
        style={styles.input}
        placeholder="Máx 100 caracteres"
        value={shortDescription}
        onChangeText={setShortDescription}
      />

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onNext}>
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Paso 2: Desc larga, ubicación, duración
function Step2({
  longDescription,
  setLongDescription,
  location,
  setLocation,
  duration,
  setDuration,
  onNext,
  onBack,
}: {
  longDescription: string;
  setLongDescription: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  duration: string;
  setDuration: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.titleText}>Paso 2: Detalles y Ubicación</Text>

      <Text style={styles.label}>Descripción larga</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        value={longDescription}
        onChangeText={setLongDescription}
        placeholder="Describe el trabajo con detalle"
      />

      <Text style={styles.label}>Ubicación *</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Ej. Madrid, zona centro..."
      />

      <Text style={styles.label}>Duración *</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="3 horas, 1 día, etc"
      />

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={onBack}>
          <Text style={styles.btnText}>Volver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onNext}>
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Paso 3: Tarifa y Confirmación
function Step3({
  rate,
  setRate,
  onBack,
  onFinish,
}: {
  rate: string;
  setRate: (v: string) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.titleText}>Paso 3: Tarifa y Confirmación</Text>

      <Text style={styles.label}>Tarifa €/hora *</Text>
      <TextInput
        style={styles.input}
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
        placeholder="Ej: 12"
      />

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={onBack}>
          <Text style={styles.btnText}>Volver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onFinish}>
          <Text style={styles.btnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

  {/* Estilos */}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_COLOR,
    },
    card: {
      backgroundColor: ELEMENT_BG,
      borderRadius: 15,
      padding: 20,
      margin: 20,
      // Sombra neomórfica
      shadowColor: SHADOW_COLOR,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    titleText: {
      fontSize: 18,
      marginBottom: 15,
      fontWeight: '600',
      textAlign: 'center',
      color: '#333',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 15,
      marginBottom: 5,
      color: '#555',
    },
    input: {
      backgroundColor: ELEMENT_BG,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 14,
      color: '#333',
  
      // Sombra suave
      shadowColor: SHADOW_COLOR,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    multiline: {
      minHeight: 60,
      textAlignVertical: 'top',
    },
    btnRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 25,
    },
    btn: {
      flex: 1,
      marginHorizontal: 5,
      borderRadius: 25,
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
  
      // Sombra suave
      shadowColor: SHADOW_COLOR,
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 3,
    },
    btnPrimary: {
      backgroundColor: PRIMARY_COLOR,
    },
    btnSecondary: {
      backgroundColor: '#aaa',
    },
    btnText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '600',
    },
  });