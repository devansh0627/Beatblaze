// Seekbar.js
import React from "react";
import { View, TouchableOpacity, Animated,AccessibilityInfo } from "react-native";

const Seekbar = ({
  width,
  height,
  backgroundColor,
  progressColor,
  progressWidth,
  progress,
  onSeekChange,
  onSeekStop,
  thumbColor,
}) => {
  const [isSeeking, setIsSeeking] = React.useState(false);
  const [progressAnimation, setProgressAnimation] = React.useState(new Animated.Value(0));
  const [progressValue, setProgressValue] = React.useState(0);

  const handlePress = (event) => {
    setIsSeeking(true);
    const x = event.nativeEvent.locationX;
    const seekPercent = (x / width) * 100;
    setProgressAnimation(Animated.timing(progressAnimation, {
      toValue: seekPercent,
      duration: 0,
      useNativeDriver: false,
    }));
    onSeekChange(seekPercent);
  };

  const handleRelease = () => {
    setIsSeeking(false);
    onSeekStop(progressValue);
  };

  React.useEffect(() => {
    progressAnimation.addListener(({ value }) => {
      setProgressValue(value);
    });
    onSeekStop(progressValue);
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  React.useEffect(() => {
    if (!isSeeking) {
      return;
    }
    progressAnimation.stopAnimation(() => {
      progressAnimation.setValue(progress);
    });
  }, [progress]);

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: backgroundColor,
        position: "relative",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: `${progressValue}%`,
          backgroundColor: progressColor,
          zIndex: 1,
          borderRadius: 5,
        }}
      />
      <TouchableOpacity
        onPress={handlePress}
        onPressOut={handleRelease}
        style={{
          position: "absolute",
          top: 0,
          left: `${progressValue}%`,
          height: "100%",
          width: progressWidth,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: height / 2,
            width: height / 2,
            borderRadius: height / 2,
            backgroundColor: thumbColor,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Seekbar;