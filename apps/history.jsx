import createHashHistory from 'history/lib/createHashHistory';
import { useRouterHistory } from 'react-router';

export default useRouterHistory(createHashHistory)({});
