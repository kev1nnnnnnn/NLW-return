import React, { useState } from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity 

} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../../components/Widget';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { Button } from '../../components/Button';

import { styles } from './styles';
import { theme } from '../../theme';
import {feedbackTypes } from '../../utils/feedbackTypes';

import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {

    const [isSendingFeedback, setIsSendFeedback] = useState(false);
    const  [screenshot, setScreenshot] = useState<string | null>(null)
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [comment, setComment] = useState('');
    
    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => {
            console.log(uri);
            setScreenshot(uri);
            
        })
        .catch(error => console.log(error))
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }
    
    async function handleSendFeedback() {
        if(isSendingFeedback) {
            return;
        }

        setIsSendFeedback(true);
        const screenshotBase64 = screenshot && FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png:base64, ${screenshotBase64}`,
                comment
                
            });

            onFeedbackSent();

        } catch (error) {
            console.log(error);
            setIsSendFeedback(false);
            
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image 
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>

                </View>


            </View>

        <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem?  Queremos corrigir."
        placeholderTextColor={theme.colors.surface_secondary}
      
        onChangeText={setComment}
        />

        <View style={styles.footer}>
            <ScreenshotButton 
            onTakeShot={handleScreenshot}
            onRemoveShot={handleScreenshotRemove}
            screenShot={screenshot}
            />

            <Button 
            onPress={handleSendFeedback}
            isLoading={isSendingFeedback} />
        </View>

    </View>
  );
}
// https://github.com/rodrigorgtic.png