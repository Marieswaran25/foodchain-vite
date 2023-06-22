import { Bars } from 'react-loader-spinner';
import colors from '../../assets/theme/colors.module.scss';

function Spinner() {
      return <Bars height='80' width='80' color={colors.B5} ariaLabel='bars-loading' wrapperStyle={{}} wrapperClass='' visible={true} />;
}

export default Spinner;
