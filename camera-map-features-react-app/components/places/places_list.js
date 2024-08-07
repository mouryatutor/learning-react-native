import { FlatList, StyleSheet, Text, View } from  "react-native";
import PlaceItem from "./placeItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";


function PlacesList({places}) { 

    const navigation = useNavigation();

    function selectPlaceHandler(id) {
        navigation.navigate('PlaceDetails' , {
            placeId: id
        })
    }

    if(!places || places.length === 0) {
        return <View style={styles.fallBackContainer}>
            <Text style={styles.fallBackText}> No places added yet - start adding some </Text>
        </View>
    }

    return <FlatList    
                data={places}
                keyExtractor={(item) => item.id }
                renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
                style={styles.list}
             />
}

export default PlacesList;

const styles = StyleSheet.create({
        list: {
            margin: 16
        },
        fallBackContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        fallBackText: {
            fontSize: 16,
            color: Colors.primary200
        }
})