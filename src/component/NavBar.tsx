
import React from 'react';

interface DetailItem {
    name: string
    value: string
}

export default class NavBar extends React.Component<{}, {}> {

    render() {
        return <a href="/">
                <img src="assets/logo.png" width="434" />
            </a>
    }

}