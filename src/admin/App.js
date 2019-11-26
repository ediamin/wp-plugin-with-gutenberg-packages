/**
 * WordPress dependencies
 */
import { Button, Notice } from '@wordpress/components';
import { withState } from '@wordpress/compose';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';

function App( { title, content, isWorking, notice, noticeType, setState } ) {
    async function submitForm( evt ) {
        evt.preventDefault();

        setState( {
            isWorking: true,
        } );

        try {
            const response = await apiFetch( {
                path: '/wp/v2/posts',
                method: 'post',
                data: {
                    title,
                    content,
                    status: 'publish',
                },
            } );

            setState( {
                notice: sprintf(
                    __( 'Post created successfully. <a href="%s" target="_blank">Go to post page.</a>', 'wp-guten' ),
                    response.link
                ),
                noticeType: 'success',
                title: '',
                content: '',
                isWorking: false,
            } );
        } catch ( error ) {
            setState( {
                notice: error.message,
                noticeType: 'error',
                isWorking: false,
            } );
        }
    }

    return (
        <div className="wrap">
            <h1>{ __( 'Create Post', 'wp-guten' ) }</h1>

            { notice && <Notice status={ noticeType } onRemove={ () => setState( { notice: null } ) } __unstableHTML={ true }>{ notice }</Notice> }

            <form onSubmit={ submitForm }>
                <fieldset disabled={ isWorking }>
                    <p>
                        <label htmlFor="title">{ __( 'Title', 'wp-guten' ) }</label>
                        <input
                            type="text"
                            id="title"
                            onChange={ ( evt ) => setState( { title: evt.target.value } ) }
                            value={ title }
                        />
                    </p>

                    <p>
                        <label htmlFor="content">{ __( 'Content', 'wp-guten' ) }</label>
                        <textarea
                            id="content"
                            cols="30"
                            rows="10"
                            onChange={ ( evt ) => setState( { content: evt.target.value } ) }
                            value={ content }
                        ></textarea>
                    </p>

                    <Button
                        type="submit"
                        isPrimary={ true }
                        isBusy={ isWorking }
                    >{ __( 'Submit', 'wp-guten' ) }</Button>
                </fieldset>
            </form>
        </div>
    );
}

export default withState( {
    title: '',
    content: '',
    isWorking: false,
    notice: null,
    noticeType: 'error',
} )( App );
