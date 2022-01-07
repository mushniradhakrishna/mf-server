import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import './HomePage.scss';

const HomePage = observer(() => {
	const { t } = useTranslation();

	return (
		<div className="home-page">
			<h2>{t('WELCOME_TEXT')}!!!</h2>
		</div>
	);
});

export default HomePage;
