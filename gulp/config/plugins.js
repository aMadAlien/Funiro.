// find and replace text (@img -> img)
import replace from "gulp-replace";
// error handling
import plumber from "gulp-plumber";
// notifing
import notify from "gulp-notify";
// local server
import browsersync from "browser-sync";
// check if img updated
import newer from 'gulp-newer';
// 
import ifPlugin from 'gulp-if';

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}