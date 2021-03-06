/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: tableselection */
/* bender-include: ../../_helpers/tableselection.js */
/* global createPasteTestCase */

( function() {
	'use strict';

	bender.editors = {
		classic: {}
	};

	var tests = {
		'test doesnt break regular paste': function( editor ) {
			bender.tools.setHtmlWithSelection( editor, '<p>foo^bar</p>' );
			bender.tools.emulatePaste( editor, '<p>bam</p>' );

			editor.once( 'afterPaste', function() {
				resume( function() {
					assert.areSame( '<p>foobambar</p>', editor.getData() );
				} );
			} );

			wait();
		},

		'test merge row after': createPasteTestCase( 'merge-row-after', '2cells1row' ),

		'test merge row before': createPasteTestCase( 'merge-row-before', '2cells1row' ),

		'test merge multi rows after': createPasteTestCase( 'merge-rows-after', '2cells2rows' ),

		'test merge multi rows before': createPasteTestCase( 'merge-rows-before', '2cells2rows' ),

		'test merge multi rows after empty cell': createPasteTestCase( 'merge-rows-after-empty', '2cells2rows' ),

		'test merge multi rows before empty cell': createPasteTestCase( 'merge-rows-before-empty', '2cells2rows' )
	};

	tests = bender.tools.createTestsForEditors( CKEDITOR.tools.objectKeys( bender.editors ), tests );

	tableSelectionHelpers.ignoreUnsupportedEnvironment( tests );

	bender.test( tests );
} )();
