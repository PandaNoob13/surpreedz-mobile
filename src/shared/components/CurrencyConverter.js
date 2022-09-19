import { Text } from "react-native-ui-lib";
import { NumericFormat } from "react-number-format";

const NumberCurrency = (props) => {
    const {price, currency} = props;
    return (
      <NumericFormat
        value={price}
        displayType={"text"}
        isNumericString={true}
        fixedDecimalScale={true}
        decimalScale={2}
        thousandSeparator="." decimalSeparator=','
        prefix={`${currency}`}
        renderText={(value) => <Text colourTextPrimary text70H style={{fontWeight: '700'}} {...props}>{value}</Text>}
      />
    );
  };
  
  export default NumberCurrency;