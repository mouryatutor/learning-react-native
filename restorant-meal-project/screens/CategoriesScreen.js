import { FlatList } from "react-native";
import { CATEGORIES } from "../dummy-data";
import CategoryGroupTile from "../components/CategoryGroupTile";



function CategoriesScreen({navigation}) {

    function renderCategoryItem(itemData){

        function pressHandler() {
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id
            })
        }
    
        return (
            <CategoryGroupTile 
                title={itemData.item.title} 
                color={itemData.item.color} 
                onPress={pressHandler} />
        )
    }
    
    return  <FlatList   
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                numColumns={2}
             />
}

export default CategoriesScreen;