import { Text } from "react-native-ui-lib";
import { NumericFormat } from "react-number-format";

const NumberCurrency = ( {textParams, price, currency} ) => {
    return (
      <NumericFormat
        value={price}
        displayType={"text"}
        isNumericString={true}
        fixedDecimalScale={true}
        decimalScale={2}
        thousandSeparator="." decimalSeparator=','
        prefix={`${currency}`}
        renderText={(value) => <Text colourTextPrimary text70H style={{fontWeight: '700'}} {...textParams}>{value}</Text>}
      />
    );
  };
  
  export default NumberCurrency;