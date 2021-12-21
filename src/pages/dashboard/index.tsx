import { Button } from 'antd';
import React from 'react';
import request from 'src/request';

const Dashboard: React.FunctionComponent = () => {
  return (
    <div>
      Dashboard
      <Button onClick={async () => await request.get('/session/user')}>
        request
      </Button>
    </div>
  );
};

export default Dashboard;
