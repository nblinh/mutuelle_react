storiesOf('Bénéficiaire', module)
    .addDecorator(themeDecorator)
    .add('Résumé', () => (
        <BeneficiarySummary age={32} product="TESAHTN302" department="54" />
    ));
