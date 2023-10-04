import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

import Rating from "../../assets/images/rating.png";
import UnRating from "../../assets/images/unrating.png";

const RatingBar = ({rating,onChange}:{rating:string,onChange:(rating:number)=>void}) => {
  // To set the default Star Selected
  const [defaultRating] = useState(rating?Number(rating):0);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <View style={styles.customRatingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => onChange(item)}
          >
            <Image
              style={styles.starImageStyle}
              source={item <= defaultRating ? Rating : UnRating}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  starImageStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    marginEnd: 5,
  },
  customRatingBarStyle: {
    flexDirection: "row",
    marginTop: 20,
  },
});
export default RatingBar;
