import { View,StyleSheet} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';


const SpinnerLoading = (props) => {

  return (
        <View>
        <Spinner
        visible={props.onShowSpinner}
        // textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        />
        </View>
  )
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
  });

export default SpinnerLoading