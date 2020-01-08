/**
 * Creates a grid of images like the one flickr uses, without any third party dependencies.
 *
 * @file            ImageGrid.js
 * @package         BH
 * @dependencies    -
 */

;(function(App, window, document, undefined) {
    'use strict';

    /**
     * Creates a grid of images like the one flickr uses.
     * 
     * @param {array}   images          An array containing all the images ({image:'http://..', width:'120', height:'300'}).
     * @param {element} container       The container element (we take the width form this element).
     * @param {int}     rowTargetHeight The start height of each row.
     * @param {int}     borderOffset    Border offset.
     *
     * @return {object}
     */
    App.ImageGrid = function(images, container, rowTargetHeight, borderOffset) {
        /**
         * The container element
         * @var {element}
         */
        this.container = null;

        /**
         * The max width of a row
         * @var {int}
         */
        this.maxWidth = 0;

        /**
         * The initial height of a row
         * @var {int}
         */
        this.targetHeight = 500;

        /**
         * The original images array
         * @var {array}
         */
        this.originalImages = null;

        /**
         * An array with the images.
         * @var {array}
         */
        this.processedImages = null;

        /**
         * Border offset per image.
         * @var {inte}
         */
        this.borderOffset = 0;


        /**
         * Initializer.
         * 
         * @param {array}   images          An array containing all the images ({image:'http://..', width:'120', height:'300'}).
         * @param {element} container       The container element (we take the width form this element).
         * @param {int}     rowTargetHeight The start height of each row.
         * @param {int}     borderOffset    Border offset.
         *
         * @return {void}
         */
        this.initialize = function(images, container, rowTargetHeight, borderOffset) {
            this.originalImages = images;
            this.targetHeight = rowTargetHeight;
            this.container = container;
            this.borderOffset = borderOffset;

            this.maxWidth = this.container.clientWidth;            
            this.processedImages = [];

            for(var i = 0; i < 33; i++) {

                let width;
                let height;

                if (i == 12 || i == 17 || i == 20 || i == 21 || i == 30) {
                    width = 400;
                    height = 300;
                } else {
                    width = 300;
                    height = 400;
                }

                width = width * (this.targetHeight / height); 

                var image = {
                    'width': width,
                    'height': this.targetHeight,
                    'image': "images/pic" + (i + 1) + ".jpg"
                }

                this.processedImages.push(image);

                if (i == 17) {
                    var image = {
                        'width': width,
                        'height': this.targetHeight,
                        'image': "images/pic185.jpg"
                    }

                    this.processedImages.push(image);
                }
            }
            
            this.draw();
        };

        /**
         * Main function, generates the grid with all the images, 
         * attaches it to the container.
         * 
         * @return {void}
         */
        this.draw = function() {

            var rows = this.buildRows();

            for(var i = 0; i < rows.length; i++) {
                rows[i] = this.fitImagesInRow(rows[i]);

                rows[i] = this.normalizeImages(rows[i]);

                var difference = (this.maxWidth- this.getCumulativeWidth(rows[i]));
                var amountOfImages = rows[i].length;

                if(amountOfImages > 1 && difference < 10) {
                    var addToEach = difference / amountOfImages;
                    for(var n = 0; n < rows[i].length; n++) {
                        rows[i][n].width += addToEach;
                    }

                    rows[i] = this.normalizeImages(rows[i]);


                    rows[i][rows[i].length-1].width += (this.maxWidth - this.getCumulativeWidth(rows[i]));
                }
            }

            this.container.innerHTML = this.renderGrid(rows);
        };

        this.scaleHeight = function(currentWidth, row) {
            let diff = this.maxWidth - currentWidth;
            let amount = parseInt(diff/row.length);

            for (let idx in row) {
                let img = row[idx];
                let newWidth = img.width + amount;
                // img.height = (img.height * (newWidth / img.width));
                img.width = newWidth;
            }
        }

        /**
         * Generates the rows (tries to fit as many images as possible in each row)
         * 
         * @return {array} An array with rows of images.
         */
        this.buildRows = function() {
            var currentRow = 0;
            var currentWidth = 0;
            var imageCounter = 0;
            var rows = [];

            while(this.processedImages[imageCounter]) {
                if(currentWidth + this.processedImages[imageCounter].width + this.borderOffset >= this.maxWidth) {

                    // Now that we can't fit in any more images, for the current row increase images until it perfectly fits maxWidth
                    this.scaleHeight(currentWidth, rows[currentRow]);
                    currentRow++;
                    currentWidth = 0;

                }
                if(!rows[currentRow]) {
                    rows[currentRow] = [];
                }

                rows[currentRow].push(this.processedImages[imageCounter]);
                currentWidth += this.processedImages[imageCounter].width + this.borderOffset;

                imageCounter++;
            };

            this.scaleHeight(currentWidth, rows[rows.length-1]);
            return rows;
        };

        /**
         * Normalizes an image (i.e. changes the width and height properties
         * to integers from floats).
         * 
         * @param {Object} image A single image object.
         *
         * @return {Object} The same object with integers as width/height
         */
        this.normalizeImage = function(image) {
            image.width =  parseInt(image.width);
            image.height = parseInt(image.height);

            return image;
        };

        /**
         * Normalizes an array of images (i.e. changes the width and height properties
         * to integers from floats).
         * 
         * @param {array}   images An array containing image objects.
         *
         * @return {array} The same array with image object's width/height properties as integers.
         */
        this.normalizeImages = function(images) {
            for(var i = 0; i < images.length; i++) {
                this.normalizeImage(images[i]);
            }

            return images;
        };

        /**
         * Resizes images so they fit within a row based on the width
         * of the container.
         * 
         * @param {array}  images An array containing image objects.
         *
         * @return {array} The same array but images should be smaller.
         */
        this.fitImagesInRow = function(images) {
            while(this.getCumulativeWidth(images) > this.maxWidth) {
                for(var i = 0; i < images.length; i++) {
                    images[i] = this.makeSmaller(images[i]);
                }
            };

            return images;
        };

        /**
         * Renders the grid from the rows.
         * 
         * @param {array}  rows An array with the rows containing the image objects.
         *
         * @return {string} The rendered html.
         */
        this.renderGrid = function(rows) {
            var output = '';
            for(var i = 0; i < rows.length; i++) {
                output += '<div class="image-row" style="margin: 0 auto;">';
                for(var n = 0; n < rows[i].length; n++) {
                    var image = rows[i][n];
                    output += '<img class="grid-image" src="' + image.image + '" style="width:' + Math.ceil(image.width) + 'px; height:' + image.height + 'px;" />';
                }
                output += '</div>';
            }

            return output;
        };

        /**
         * Makes an image smaller but keeps it's aspect ratio.
         * 
         * @param {object} image  The image to make smaller.
         * @param {int}    amount By how much the height should be made smaller.
         *
         * @return {object} The same image, but smaller.
         */
        this.makeSmaller = function(image, amount) {
            amount = amount || 1;

            var newHeight = image.height - amount;
            image.width = ((image.width + this.borderOffset) * (newHeight / image.height));
            image.height = newHeight;

            return image;
        };

        /**
         * Calculates the cumulative width of a row of images.
         * 
         * @param {array} images  An array with image objects.
         *
         * @return {int} The width of all the images combined.
         */
        this.getCumulativeWidth = function(images) {
            var width = 0;

            for(var i = 0; i < images.length; i++) {
                width += images[i].width;
            }

            width += (images.length-1);

            return width;
        };

        // Initializes the object.
        this.initialize(images, container, rowTargetHeight, borderOffset);
    };
}(window.BH = window.BH || {}, window, document));