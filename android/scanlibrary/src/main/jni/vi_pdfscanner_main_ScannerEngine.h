/* DO NOT EDIT THIS FILE - it is machine generated */
#include <jni.h>
/* Header for class vi_pdfscanner_main_ScannerEngine */

#ifndef _Included_vi_pdfscanner_main_ScannerEngine
#define _Included_vi_pdfscanner_main_ScannerEngine
#ifdef __cplusplus
extern "C" {
#endif
#undef vi_pdfscanner_main_ScannerEngine_BIND_ABOVE_CLIENT
#define vi_pdfscanner_main_ScannerEngine_BIND_ABOVE_CLIENT 8L
#undef vi_pdfscanner_main_ScannerEngine_BIND_ADJUST_WITH_ACTIVITY
#define vi_pdfscanner_main_ScannerEngine_BIND_ADJUST_WITH_ACTIVITY 128L
#undef vi_pdfscanner_main_ScannerEngine_BIND_ALLOW_OOM_MANAGEMENT
#define vi_pdfscanner_main_ScannerEngine_BIND_ALLOW_OOM_MANAGEMENT 16L
#undef vi_pdfscanner_main_ScannerEngine_BIND_AUTO_CREATE
#define vi_pdfscanner_main_ScannerEngine_BIND_AUTO_CREATE 1L
#undef vi_pdfscanner_main_ScannerEngine_BIND_DEBUG_UNBIND
#define vi_pdfscanner_main_ScannerEngine_BIND_DEBUG_UNBIND 2L
#undef vi_pdfscanner_main_ScannerEngine_BIND_IMPORTANT
#define vi_pdfscanner_main_ScannerEngine_BIND_IMPORTANT 64L
#undef vi_pdfscanner_main_ScannerEngine_BIND_NOT_FOREGROUND
#define vi_pdfscanner_main_ScannerEngine_BIND_NOT_FOREGROUND 4L
#undef vi_pdfscanner_main_ScannerEngine_BIND_WAIVE_PRIORITY
#define vi_pdfscanner_main_ScannerEngine_BIND_WAIVE_PRIORITY 32L
#undef vi_pdfscanner_main_ScannerEngine_CONTEXT_IGNORE_SECURITY
#define vi_pdfscanner_main_ScannerEngine_CONTEXT_IGNORE_SECURITY 2L
#undef vi_pdfscanner_main_ScannerEngine_CONTEXT_INCLUDE_CODE
#define vi_pdfscanner_main_ScannerEngine_CONTEXT_INCLUDE_CODE 1L
#undef vi_pdfscanner_main_ScannerEngine_CONTEXT_RESTRICTED
#define vi_pdfscanner_main_ScannerEngine_CONTEXT_RESTRICTED 4L
#undef vi_pdfscanner_main_ScannerEngine_MODE_APPEND
#define vi_pdfscanner_main_ScannerEngine_MODE_APPEND 32768L
#undef vi_pdfscanner_main_ScannerEngine_MODE_ENABLE_WRITE_AHEAD_LOGGING
#define vi_pdfscanner_main_ScannerEngine_MODE_ENABLE_WRITE_AHEAD_LOGGING 8L
#undef vi_pdfscanner_main_ScannerEngine_MODE_MULTI_PROCESS
#define vi_pdfscanner_main_ScannerEngine_MODE_MULTI_PROCESS 4L
#undef vi_pdfscanner_main_ScannerEngine_MODE_PRIVATE
#define vi_pdfscanner_main_ScannerEngine_MODE_PRIVATE 0L
#undef vi_pdfscanner_main_ScannerEngine_MODE_WORLD_READABLE
#define vi_pdfscanner_main_ScannerEngine_MODE_WORLD_READABLE 1L
#undef vi_pdfscanner_main_ScannerEngine_MODE_WORLD_WRITEABLE
#define vi_pdfscanner_main_ScannerEngine_MODE_WORLD_WRITEABLE 2L
#undef vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_DIALER
#define vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_DIALER 1L
#undef vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_DISABLE
#define vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_DISABLE 0L
#undef vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_SEARCH_GLOBAL
#define vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_SEARCH_GLOBAL 4L
#undef vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_SEARCH_LOCAL
#define vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_SEARCH_LOCAL 3L
#undef vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_SHORTCUT
#define vi_pdfscanner_main_ScannerEngine_DEFAULT_KEYS_SHORTCUT 2L
#undef vi_pdfscanner_main_ScannerEngine_RESULT_CANCELED
#define vi_pdfscanner_main_ScannerEngine_RESULT_CANCELED 0L
#undef vi_pdfscanner_main_ScannerEngine_RESULT_FIRST_USER
#define vi_pdfscanner_main_ScannerEngine_RESULT_FIRST_USER 1L
#undef vi_pdfscanner_main_ScannerEngine_RESULT_OK
#define vi_pdfscanner_main_ScannerEngine_RESULT_OK -1L
/*
 * Class:     vi_pdfscanner_main_ScannerEngine
 * Method:    getScannedBitmap
 * Signature: (IILandroid/graphics/Bitmap;FFFFFFFF)Landroid/graphics/Bitmap;
 */
JNIEXPORT jobject JNICALL Java_vi_pdfscanner_main_ScannerEngine_getScannedBitmap
        (JNIEnv *, jobject, jobject, jfloat, jfloat, jfloat, jfloat, jfloat, jfloat, jfloat, jfloat);


JNIEXPORT jfloatArray JNICALL Java_vi_pdfscanner_main_ScannerEngine_getPoints
        (JNIEnv *, jobject, jobject);

JNIEXPORT jobject JNICALL Java_vi_pdfscanner_main_ScannerEngine_getBWBitmap
        (JNIEnv *, jobject, jobject);

JNIEXPORT jobject JNICALL Java_vi_pdfscanner_main_ScannerEngine_getMagicColorBitmap
        (JNIEnv *, jobject, jobject);

JNIEXPORT jobject JNICALL Java_vi_pdfscanner_main_ScannerEngine_getGrayBitmap
        (JNIEnv *, jobject, jobject);


#ifdef __cplusplus
}
#endif
#endif