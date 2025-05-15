<script setup lang="ts">
import mitt from '@/plugins/mitt';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import rules from '@/tools/rules';

const user = useUserStore();
const addresses = ref(user.userAddresses);
const preferredAddressId = ref(user.userPreferredAddressId);

// 新增：控制dialog显示
const createDialog = ref(false);
// 新增：表单数据
const newAddress = ref({
  name: '',
  address: '',
  phone: '',
  call: ''
});

// 新增：保存新地址
const saveNewAddress = () => {
  // 校验必填
  if (!newAddress.value.name || !newAddress.value.address || !newAddress.value.phone || !newAddress.value.call) {
    mitt.emit('openDialog', { msg: '请填写完整信息', cancelable: false });
    return;
  }
  // 校验手机号
  const phoneCheck = rules.phone(newAddress.value.phone);
  if (phoneCheck !== true) {
    mitt.emit('openDialog', { msg: phoneCheck, cancelable: false });
    return;
  }
  // 生成唯一id
  const id = Date.now();
  const addressObj = { id, ...newAddress.value };
  user.addAddress(addressObj); // 只调用一次添加
  createDialog.value = false;
  // 重置表单
  newAddress.value = { name: '', address: '', phone: '', call: '' };
  // 刷新信息
  preferredAddressId.value = user.userPreferredAddressId;
};

const handlePreferredAddressClick = (addressId) => {
  preferredAddressId.value = addressId;
  user.setPreferredAddress(addressId);
};
const openDeleteAddressConfirmDialog = (addressId) => {
  const address = addresses.value.find(item => item.id === addressId);
  mitt.emit('openDialog', {
    msg: `确定删除地址 ${address.name} 吗？`,
    callbackConfirm: () => {
      user.removeAddress(addressId);
      mitt.emit('closeDialog');
    },
    cancelable: true,
  });
};
</script>

<template>
  <div class="flex flex-col h-full">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          icon="mdi-arrow-left"
          @click="mitt.emit('back')"
        />
      </template>

      <v-app-bar-title>地址管理</v-app-bar-title>

      <template #append>
        <!-- 新增：点击按钮打开dialog -->
        <v-btn
          icon="mdi-plus"
          @click="createDialog = true"
        />
      </template>
    </v-app-bar>
    <v-main>
      <v-list v-model:activated="preferredAddressId">
        <v-list-item
          v-for="item in addresses"
          :key="item.id"
          :value="item.id"
          class="py-3"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>

          <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">
            {{ item.call }}
          </v-list-item-subtitle>

          <v-list-item-subtitle class="text-high-emphasis">
            {{ item.address }}
          </v-list-item-subtitle>

          <template #append>
            <v-list-item-action class="flex-column align-end">
              <small class="mb-4 text-high-emphasis opacity-60">{{ item.phone }}</small>

              <v-spacer />

              <div class="flex gap-4">
                <v-btn
                  density="compact"
                  :icon="item.id === preferredAddressId ? 'mdi-star' : 'mdi-star-outline'"
                  variant="text"
                  @click="handlePreferredAddressClick(item.id)"
                />
                <v-btn
                  color="red-lighten-2"
                  density="compact"
                  icon="mdi-delete-outline"
                  variant="text"
                  @click="openDeleteAddressConfirmDialog(item.id)"
                />
              </div>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-main>
    <!-- 新增：创建地址的弹框 -->
    <v-dialog
      v-model="createDialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title>新建地址</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newAddress.name"
            variant="outlined"
            label="名称"
            required
          />
          <v-text-field
            v-model="newAddress.call"
            variant="outlined"
            label="联系人"
            required
          />
          <v-text-field
            v-model="newAddress.phone"
            variant="outlined"
            label="电话"
            required
          />
          <v-text-field
            v-model="newAddress.address"
            variant="outlined"
            label="详细地址"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="createDialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            @click="saveNewAddress"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>