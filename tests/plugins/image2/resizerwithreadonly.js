/* bender-tags: editor,widget */
/* bender-ckeditor-plugins: image2,toolbar */

( function() {
	'use strict';

	bender.test( {
		'test readOnly set to false': function() {
			bender.editorBot.create( {
				name: 'editor1',
				config: {
					language: 'en'
				}
			}, function( bot ) {
				var editor = bot.editor;

				bot.dialog( 'image', function( dialog ) {
					dialog.setValueOf( 'info', 'src', '_assets/foo.png' );
					dialog.getButton( 'ok' ).click();

					assert.areSame(
						'<span class="cke_image_resizer" title="Click and drag to resize">​</span>',
						editor.editable().getElementsByTag( 'span' ).$[ 2 ].outerHTML
					);
				} );
			} );
		},

		'test readOnly set to true': function() {
			bender.editorBot.create( {
				name: 'editor2',
				config: {
					readOnly: true
				}
			}, function( bot ) {
				var editor = bot.editor,
					listener;

				listener = editor.on( 'dataReady', function() {
					listener.removeListener();

					resume( function() {
						assert.areSame( 2, editor.editable().getElementsByTag( 'span' ).$.length );
					} );
				} );

				editor.setData( '<img src="_assets/foo.png" alt="" />' );
				wait();
			} );
		}
	} );
}() );