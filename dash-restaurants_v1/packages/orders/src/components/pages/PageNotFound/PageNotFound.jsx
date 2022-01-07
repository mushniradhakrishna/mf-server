import React from 'react';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
	const { t } = useTranslation();
	return <h2>{t('PAGE_NOT_FOUND')}</h2>;
};

export default PageNotFound;
