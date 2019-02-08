import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from 'recompose';

import themeDecorator from '../../.storybook/themeDecorator';
import reduxDecorator from '../../.storybook/reduxDecorator';

import SelectList from './SelectList';
import DepartmentList from './DepartmentList';
import { ProductList } from '../products';
import { Button } from './Button';
import MultiLineButton from './MultiLineButton';
import Input from './Input';
import Slider from './Slider';
import StorybookForm from '../../.storybook/StorybookForm';
import GlassCorrectionInput from './GlassCorrectionInput';
import RadioList from './RadioList';
import Fieldset from './Fieldset';
import { lightGray } from '../theme';
import Toggle from './Toggle';

storiesOf('Formulaires', module)
    .addDecorator(themeDecorator)
    .addDecorator(reduxDecorator)
    .add('Boutons', () => (
        <div style={{ margin: '2rem' }}>
            <p>
                <Button color="primary">OK</Button>
            </p>
            <p>
                <Button color="secondary">Confirmer</Button>
            </p>
            <p>
                <Button>Suivant</Button>
            </p>
            <p>
                <Button disabled>Désactivé</Button>
            </p>
            <p>
                <Button color="primary" variant="outlined">
                    Oui
                </Button>
            </p>
        </div>
    ))
    .add('Boutons multi ligne', () => (
        <div style={{ margin: '2rem' }}>
            <p>
                <MultiLineButton color="primary" variant="outlined">
                    Nouvelle<br />Recherche
                </MultiLineButton>
            </p>
        </div>
    ))
    .add('Champs de saisie', () => (
        <StorybookForm
            initialValues={{
                filled: 'Harmonie Mutuelle',
                number: 42,
            }}
        >
            <div style={{ width: 500 }}>
                <div>
                    <Input placeholder="Champ vide" name="text" />
                </div>
                <div>
                    <Input placeholder="Champ texte" name="filled" />
                </div>
                <div>
                    <Input
                        placeholder="Champ numérique"
                        name="number"
                        type="number"
                        min={0}
                        style={{ width: 90 }}
                    />
                </div>
                <div>
                    <Input placeholder="Champ en erreur" name="erred" error />
                </div>
            </div>
        </StorybookForm>
    ))
    .add('Listes déroulantes', () => (
        <div style={{ margin: '2rem', maxWidth: '15rem' }}>
            <StorybookForm initialValue={{ withValue: 's2' }}>
                <SelectList
                    name="sector"
                    placeholder="Sans valeur par défaut"
                    options={[
                        { value: 's1', label: 'Secteur 1' },
                        { value: 's2', label: 'Secteur 2' },
                        { value: 's3', label: 'Secteur 3' },
                    ]}
                />
                <SelectList
                    name="withValue"
                    placeholder="Liste déroulante"
                    options={[
                        { value: 's1', label: 'Secteur 1' },
                        { value: 's2', label: 'Secteur 2' },
                        { value: 's3', label: 'Secteur 3' },
                    ]}
                />
                <DepartmentList name="department" placeholder="Département" />
                <ProductList name="product" placeholder="Produit" />
            </StorybookForm>
        </div>
    ))
    .add('Boutons radio', () => {
        const StatefulRadioList = withState('value', 'onChange')(RadioList);

        return (
            <div
                style={{
                    margin: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        flex: '0 0 120px',
                        fontFamily: 'bree',
                        fontSize: 18,
                    }}
                >
                    Type :
                </div>
                <div>
                    <StatefulRadioList
                        label="Type"
                        name="type"
                        choices={[
                            { value: 'simple', label: 'Simple' },
                            { value: 'progressif', label: 'Progressif' },
                        ]}
                    />
                </div>
            </div>
        );
    })
    .add('Curseurs', () => {
        const StatefulExpenseSlider = withState('value', 'onChange', 50)(
            Slider,
        );

        return (
            <div style={{ margin: '2rem' }}>
                <h4>Curseur simple :</h4>
                <div style={{ maxWidth: '15rem' }}>
                    <StatefulExpenseSlider value={50} />
                </div>

                <h4 style={{ marginTop: '3rem' }}>
                    Curseur avec champ texte :
                </h4>
                <div style={{ maxWidth: '15rem' }}>
                    <StatefulExpenseSlider value={50} withInput />
                </div>

                <h4 style={{ marginTop: '3rem' }}>
                    Avec texte avant et après :
                </h4>
                <div style={{ maxWidth: '35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 0 0' }}>
                            Pour une dépense prévue de
                        </div>
                        <div
                            style={{
                                flex: '0 0 19rem',
                            }}
                        >
                            <StatefulExpenseSlider value={50} withInput />
                        </div>
                        <div style={{ flex: '0 0 32px' }}>€</div>
                    </div>
                </div>
            </div>
        );
    })
    .add('Correction des verres', () => {
        const StatefulGlassCorrectionInput = withState('value', 'onChange', 0)(
            GlassCorrectionInput,
        );

        return (
            <div style={{ margin: '2rem', maxWidth: '15rem' }}>
                <StatefulGlassCorrectionInput />
            </div>
        );
    })
    .add('Bloc de champs', () => (
        <div style={{ margin: '2rem', maxWidth: 750 }}>
            <Fieldset label="Verre n°1 et 2">
                <div
                    style={{
                        height: 300,
                        lineHeight: '300px',
                        background: lightGray,
                        textAlign: 'center',
                    }}
                >
                    Contenu du bloc de champs
                </div>
            </Fieldset>
        </div>
    ))
    .add('Interrupteurs', () => {
        const StatefulToggle = withState('value', 'onChange', false)(Toggle);

        return (
            <div style={{ margin: '2rem', maxWidth: 750 }}>
                <h4>Valeurs par défaut :</h4>
                <StatefulToggle name="defaultToggle" />
                <h4>Avec textes personnalisés :</h4>
                <StatefulToggle
                    name="customLabelToggle"
                    leftLabel="2 verres similaires"
                    rightLabel="2 verres différents"
                />
            </div>
        );
    });
