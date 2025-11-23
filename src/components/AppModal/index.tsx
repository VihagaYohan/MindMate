import React, { useState } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// components
import { AppText, AppButton, AppSpacer } from '../index'

// shared
import { Constants, Colors, DeviceUtils, Theme } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

// store
import { StateType, useStore } from '../../store'


interface propTypes {
    visible: boolean
    showIcon?: boolean
    icon?: React.ElementType
    onClose?: (value: boolean) => void
}

const AppModal = (props: propTypes) => {
    const isDarkMode: boolean = useTheme()
    const message = useStore((state) => (state as StateType).errorMessage)

    const handleClose = () => {
        if (props.onClose) {
            props.onClose(false)
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles().modalOverlay}>
                <View style={styles(isDarkMode).modalContent}>

                    <AppText
                        text={message}
                        textStyle={styles(isDarkMode).modalTitle}
                        fontSize={15} />

                    <AppSpacer
                        isVertical
                        size={Constants.SPACE_MEDIUM} />

                    <AppButton
                        isPrimary
                        label='Close'
                        onPress={() => handleClose()} />
                </View>
            </View>
        </Modal>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        backgroundColor: isDarkMode ? Theme.darkTheme.colors.background : Theme.lightTheme.colors.background,
        borderWidth: 1,
        borderColor: isDarkMode ? Colors.neutral40 : Colors.neutral90,
        borderRadius: 12,
        padding: 24,
        width: '85%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 24,
        color: '#666',
        lineHeight: 22,
        textAlign: 'center',
    },
    button: {
        backgroundColor: Colors.primaryCore,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default AppModal