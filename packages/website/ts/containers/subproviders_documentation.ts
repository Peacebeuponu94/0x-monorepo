import { DocsInfo, DocsInfoConfig, SupportedDocJson } from '@0x/react-docs';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DocPage as DocPageComponent, DocPageProps } from 'ts/pages/documentation/doc_page';
import { Dispatcher } from 'ts/redux/dispatcher';
import { State } from 'ts/redux/reducer';
import { DocPackages, ScreenWidths } from 'ts/types';
import { Translate } from 'ts/utils/translate';

/* tslint:disable:no-var-requires */
const IntroMarkdownV1 = require('md/docs/subproviders/introduction');
const InstallationMarkdownV1 = require('md/docs/subproviders/installation');
const LedgerNodeHidMarkdown = require('md/docs/subproviders/ledger_node_hid');
/* tslint:enable:no-var-requires */

const docSections = {
    introduction: 'introduction',
    installation: 'installation',
    ledgerNodeHid: 'ledger-node-hid-issue',
};

const docsInfoConfig: DocsInfoConfig = {
    id: DocPackages.Subproviders,
    packageName: '@0x/subproviders',
    type: SupportedDocJson.TypeDoc,
    displayName: 'Subproviders',
    packageUrl: 'https://github.com/0xProject/0x-monorepo',
    markdownMenu: {
        'getting-started': [docSections.introduction, docSections.installation, docSections.ledgerNodeHid],
    },
    sectionNameToMarkdownByVersion: {
        '0.0.1': {
            [docSections.introduction]: IntroMarkdownV1,
            [docSections.installation]: InstallationMarkdownV1,
            [docSections.ledgerNodeHid]: LedgerNodeHidMarkdown,
        },
    },
    markdownSections: docSections,
};
const docsInfo = new DocsInfo(docsInfoConfig);

interface ConnectedState {
    docsVersion: string;
    availableDocVersions: string[];
    docsInfo: DocsInfo;
    translate: Translate;
    screenWidth: ScreenWidths;
}

interface ConnectedDispatch {
    dispatcher: Dispatcher;
}

const mapStateToProps = (state: State, _ownProps: DocPageProps): ConnectedState => ({
    docsVersion: state.docsVersion,
    availableDocVersions: state.availableDocVersions,
    translate: state.translate,
    docsInfo,
    screenWidth: state.screenWidth,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): ConnectedDispatch => ({
    dispatcher: new Dispatcher(dispatch),
});

export const Documentation: React.ComponentClass<DocPageProps> = connect(mapStateToProps, mapDispatchToProps)(
    DocPageComponent,
);
