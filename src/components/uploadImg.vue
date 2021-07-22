<template>
  <el-upload
    class="avatar-uploader"
    :action="config.uploadUrl"
    :data="data.uploadKey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="data.image" :src="data.image" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { onMounted, reactive, watch } from '@vue/composition-api'
import { QiniuToken } from '@/api/common'

export default {
  name: 'uploadImg',
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, { root, emit }) {
    console.log(props.config)
    const data = reactive({
      image: '',
      uploadKey: {
        token: '',
        key: ''
      }
    })

    // 缩略图方法
    const handleAvatarSuccess = (res, file) => {
      data.image = `http://www-web-jshtml-cn-idva7max.web-jshtml.cn/${res.key}`
      emit('update: imgUrl', data.image)
    }
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        root.$message.error('上传头像图片只能是JPG格式!')
      }
      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // 文件名转码
      const suffix = file.name
      data.uploadKey.key = encodeURI(`${suffix}`)
      return isJPG && isLt2M
    }

    // 获取七牛云token
    const getQiniuToken = () => {
      // 要求传入的参数
      const requestData = {
        ak: props.config.ak,
        sk: props.config.sk,
        buckety: props.config.buckety
      }
      QiniuToken(requestData).then(response => {
        data.uploadKey.token = (response.data.data.token).substr(1)
      }).catch(err => {
        console.log(err)
      })
    }

    watch(() => props.imgUrl, (value) => {
      console.log(value)
      data.image = value
    })

    onMounted(() => {
      getQiniuToken()
    })

    return {
      data,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
}
</script>

<style scoped>
/deep/.avatar-uploader {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
