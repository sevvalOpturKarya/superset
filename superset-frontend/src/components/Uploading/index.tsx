import React from 'react';
import { Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, FileOutlined } from '@ant-design/icons';

const UploadProgress = ({ fileName, progress, status, onRetry }) => {
  const getStatusIcon = () => {
    if (status === 'uploading') {
      return <Spin size="small" />;
    }
    if (status === 'done') {
      return <CheckCircleOutlined style={{ color: 'green', fontSize: '18px' }} />;
    }
    if (status === 'error') {
      return <CloseCircleOutlined style={{ color: 'red', fontSize: '18px' }} />;
    }
    return null;
  };

  const renderStatusText = () => {
    if (status === 'uploading') {
      return <span>Yükleniyor...</span>;
    }
    if (status === 'done') {
      return <span style={{ color: 'green' }}>Yüklendi</span>;
    }
    if (status === 'error') {
      return (
        <>
          <span style={{ color: 'red' }}>Yükleme başarısız</span>
          <button onClick={onRetry} className="retry-button" style={{ color: 'red', border: 'none', background: 'none' }}>
            <ReloadOutlined /> Tekrar Dene
          </button>
        </>
      );
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d9d9d9', padding: '8px', borderRadius: '8px', marginBottom: '8px' }}>
      <div className="upload-file-icon" style={{ marginRight: '12px' }}>
        <FileOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
      </div>
      <div className="upload-file-info" style={{ flexGrow: 1 }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{fileName}</p>
        <span>{progress} KB of 120 KB</span>
      </div>
      <div className="upload-status-icon" style={{ marginLeft: '12px' }}>
        {getStatusIcon()}
      </div>
      <div className="upload-status-text" style={{ marginLeft: '12px' }}>
        {renderStatusText()}
      </div>
    </div>
  );
};

export default UploadProgress;
