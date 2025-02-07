import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constant/constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IMenuItem } from '../../types/type';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { color } from '../../theme/appColor';
import { useTheme } from '@react-navigation/native';


interface IMenuProps {
    isVisible: boolean;
    setCloseModal: () => void;
    y: number;
    menuItem: IMenuItem[]
}

const Menu = (props: IMenuProps) => {
    const inset = useSafeAreaInsets();
    const { colors } = useTheme();

    if (!props.isVisible) return null;

    const divider = () => {
        return (
            <View
                style={styles.divider}
            />
        );
    };

    const renderItem = (item: IMenuItem, index) => {
        return (
            <Pressable style={styles.menuItemContainer} onPress={() => item.onSelect()}>
                <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={24} color={colors.text} />
                <Text style={[styles.textStyle, {color:colors.text}]} numberOfLines={1}>{item?.label}</Text>
            </Pressable>
        )
    }
    return (
        <Pressable style={[styles.visibleMenuStyle, { paddingTop: inset.top }]} onPress={props.setCloseModal}>
            <View style={styles.container} pointerEvents='box-none'>
                <View style={[styles.popupMenu, { top: props.y + 10, left: DEVICE_WIDTH / 2, width: (DEVICE_WIDTH / 2.1) }]}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={props.menuItem}
                        renderItem={({ item, index }) => renderItem(item, index)}
                        ItemSeparatorComponent={divider}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        </Pressable>
    )
}

export default Menu

const styles = StyleSheet.create({
    visibleMenuStyle: {
        position: "absolute",
        zIndex: 10,
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        backgroundColor: color.shadowColor,
    },
    container: {
        shadowColor: color.shadowColor,
        shadowOffset: {
            width: 4,
            height: 8,
        },
        shadowOpacity: 2.0,
        shadowRadius: 2,
        elevation: 10,
        backgroundColor: color.transparent,
        opacity: 1
    },
    popupMenu: {
        backgroundColor: color.charcoalGray,
        borderRadius: 10,
        shadowColor: color.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    divider: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        flexDirection: "row",
        height: 1,
        borderRadius: 2,
        marginHorizontal: 16,
    },
    menuItemContainer:{ 
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    textStyle: {
        paddingLeft: 10, textAlign: 'center'
    }
});
